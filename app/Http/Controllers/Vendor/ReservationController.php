<?php

namespace App\Http\Controllers\Vendor;

use App\Actions\Reservation\CompleteReservation;
use App\Actions\Reservation\ConfirmReservation;
use App\Actions\Reservation\DeclineReservation;
use App\Actions\Reservation\MarkNoShow;
use App\Http\Controllers\Concerns\HasVendor;
use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    use HasVendor;

    public function index(Request $request): Response
    {
        $reservations = $this->vendor()
            ->reservations()
            ->with(['customer:id,name,email,phone', 'product:id,name', 'variant:id,size,color'])
            ->when($request->input('status'), fn ($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Vendor/Reservations/Index', [
            'reservations' => $reservations,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(Reservation $reservation): Response
    {
        $this->authorize('view', $reservation);

        $reservation->load(['customer:id,name,email,phone', 'product:id,name,price', 'variant:id,size,color,sku']);

        return Inertia::render('Vendor/Reservations/Show', [
            'reservation' => $reservation,
        ]);
    }

    public function updateStatus(
        Request $request,
        Reservation $reservation,
        ConfirmReservation $confirmAction,
        DeclineReservation $declineAction,
        CompleteReservation $completeAction,
        MarkNoShow $noShowAction,
    ): RedirectResponse {
        $this->authorize('updateStatus', $reservation);

        $action = $request->input('action');

        return match ($action) {
            'confirm' => $this->handleAction($confirmAction, $reservation, __('reservation.reservation_confirmed')),
            'decline' => $this->handleDecline($request, $declineAction, $reservation),
            'complete' => $this->handleAction($completeAction, $reservation, __('reservation.reservation_completed')),
            'no_show' => $this->handleAction($noShowAction, $reservation, __('reservation.reservation_no_show')),
            default => back()->with('error', __('reservation.invalid_action')),
        };
    }

    private function handleAction(object $action, Reservation $reservation, string $message): RedirectResponse
    {
        $action->execute($reservation);

        return back()->with('success', $message);
    }

    private function handleDecline(Request $request, DeclineReservation $action, Reservation $reservation): RedirectResponse
    {
        $request->validate(['reason' => ['required', 'string', 'max:500']]);

        $action->execute($reservation, $request->input('reason'));

        return back()->with('success', __('reservation.reservation_cancelled'));
    }
}
