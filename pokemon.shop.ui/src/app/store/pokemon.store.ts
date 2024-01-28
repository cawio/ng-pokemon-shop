import { computed, inject } from '@angular/core'
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { addEntities, updateEntity, withEntities } from '@ngrx/signals/entities'
import { firstValueFrom } from 'rxjs'
import { Pokemon } from '../Models/Pokemon'
import { PokemonService } from '../services/pokemon.service'
import { CartItem } from '../Models/CartItem'

type PokemonState = {
    loading: boolean,
    error: string,
    cart: CartItem[]
}

export const PokemonStore = signalStore(
    { providedIn: 'root' },
    withState<PokemonState>({
        loading: false,
        error: '',
        cart: []
    }),
    withEntities<Pokemon>(),
    withComputed((state) => ({
        cartSize: computed(() => state.cart().length),
    })),
    withMethods((
        state,
        pokemonService = inject(PokemonService)
    ) => ({
        setLoading: (loading: boolean) => patchState(state, { loading }),
        setError: (error: string) => patchState(state, { error }),
        loadEntities: async () => {
            const entities = await firstValueFrom(pokemonService.fetchPokemons());
            patchState(state, addEntities(entities));
        },
        addToCart: (pokemon: Pokemon) => {
            if (pokemon.quantity <= 0) {
                return;
            }

            const cartItem = state.cart().find(item => item.pokemon.id === pokemon.id);
            if (cartItem) {
                const cart = state.cart().map(item => {
                    if (item.pokemon.id === pokemon.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                patchState(state, { cart });
            } else {
                patchState(state, { cart: [...state.cart(), { pokemon, quantity: 1 }] });
            }
            patchState(state, updateEntity({ id: pokemon.id, changes: { quantity: pokemon.quantity - 1 } }));
        },
        removeFromCart: (pokemon: Pokemon) => {
            const cartItem = state.cart().find(item => item.pokemon.id === pokemon.id);
            if (!cartItem) {
                return;
            }

            patchState(
                state,
                { cart: state.cart().filter(item => item.pokemon.id !== pokemon.id) }
            )
            patchState(
                state,
                updateEntity({ id: pokemon.id, changes: { quantity: pokemon.quantity + cartItem.quantity } })
            );
        },
        clearCart: () => patchState(state, { cart: [] }), // TODO: update the entities quantity
    })),
    withHooks({
        async onInit(store) {
            store.setLoading(true);
            await store.loadEntities();
            store.setLoading(false);
        },

        onDestroy(store) {
            store.setLoading(false);
            store.setError('');
        }
    })
);