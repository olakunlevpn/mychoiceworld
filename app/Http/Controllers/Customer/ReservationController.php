<?php

namespace App\Http\Controllers\Customer;

use App\Actions\Customer\CancelReservation;
use App\Actions\Customer\CreateReservation;
use App\Data\CreateReservationData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CancelReservationRequest;
use App\Http\Requests\Customer\StoreReservationRequest;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function index(Request $request): Response
    {
        $reservations = $request->user()
            ->reservations()
            ->with([
                'product:id,name,slug',
                'product.primaryImage',
                'vendor:id,store_name,slug,phone,address',
                'variant:id,size,color',
            ])
            ->when($request->input('status'), fn ($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Customer/Reservations/Index', [
            'reservations' => $reservations,
            'filters' => $request->only(['status']),
        ]);
    }

    public function show(Request $request, Reservation $reservation): Response
    {
        $this->authorize('viewOwn', $reservation);

        $reservation->load([
            'product:id,name,slug,price',
            'product.primaryImage',
            'vendor:id,store_name,slug,phone,whatsapp,email,address,city',
            'variant:id,size,color,color_hex,sku',
            'review',
        ]);

        return Inertia::render('Customer/Reservations/Show', [
            'reservation' => $reservation,
        ]);
    }

    public function store(StoreReservationRequest $request, CreateReservation $action): RedirectResponse
    {
        $data = CreateReservationData::from($request->validated());
        $action->execute($request->user(), $data);

        return back()->with('success', __('customer.reservation_created'));
    }

    public function cancel(CancelReservationRequest $request, Reservation $reservation, CancelReservation $action): RedirectResponse
    {
        $this->authorize('cancel', $reservation);

        $action->execute($reservation, $request->input('cancellation_reason'));

        return back()->with('success', __('customer.reservation_cancelled'));
    }
}
