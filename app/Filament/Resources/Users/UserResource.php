<?php

namespace App\Filament\Resources\Users;

use App\Enums\UserRole;
use App\Filament\Resources\Users\Pages\EditUser;
use App\Filament\Resources\Users\Pages\ListUsers;
use App\Filament\Resources\Users\Pages\ViewUser;
use App\Filament\Resources\Users\RelationManagers\ReservationsRelationManager;
use App\Filament\Resources\Users\RelationManagers\ReviewsRelationManager;
use App\Filament\Resources\Users\RelationManagers\WishlistsRelationManager;
use App\Filament\Resources\Users\Schemas\UserForm;
use App\Filament\Resources\Users\Tables\UsersTable;
use App\Filament\Resources\Users\Widgets\UserStats;
use App\Models\User;
use Filament\Pages\Page;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $recordTitleAttribute = 'name';

    protected static ?string $slug = 'customers';

    protected static ?int $navigationSort = 1;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-users';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.operations');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.customers');
    }

    public static function getModelLabel(): string
    {
        return __('admin.customer');
    }

    public static function getPluralModelLabel(): string
    {
        return __('admin.customers');
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) static::$model::where('role', UserRole::Customer)->count();
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->where('role', UserRole::Customer);
    }

    /**
     * @return array<string>
     */
    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'email', 'phone'];
    }

    /**
     * @return array<string, string>
     */
    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [
            __('admin.email') => $record->email,
            __('admin.city') => $record->phone ?? '-',
        ];
    }

    public static function getGlobalSearchEloquentQuery(): Builder
    {
        return parent::getGlobalSearchEloquentQuery()->where('role', UserRole::Customer);
    }

    public static function form(Schema $schema): Schema
    {
        return UserForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UsersTable::configure($table);
    }

    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
            ViewUser::class,
            EditUser::class,
        ]);
    }

    public static function getRelations(): array
    {
        return [
            ReservationsRelationManager::class,
            ReviewsRelationManager::class,
            WishlistsRelationManager::class,
        ];
    }

    public static function getWidgets(): array
    {
        return [
            UserStats::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListUsers::route('/'),
            'view' => ViewUser::route('/{record}'),
            'edit' => EditUser::route('/{record}/edit'),
        ];
    }
}
