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
    cart: CartItem[],
    selectedPokemon: Pokemon | undefined,
}

export const PokemonStore = signalStore(
    { providedIn: 'root' },
    withState<PokemonState>({
        loading: false,
        error: '',
        cart: [],
        selectedPokemon: undefined,
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

            const cartItem = state.cart().find(item => item.product.id === pokemon.id);
            if (cartItem) {
                const cart = state.cart().map(item => {
                    if (item.product.id === pokemon.id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                patchState(state, { cart });
            } else {
                patchState(state, { cart: [...state.cart(), { product: pokemon, quantity: 1 }] });
            }
            patchState(state, updateEntity({ id: pokemon.id, changes: { quantity: pokemon.quantity - 1 } }));
        },
        removeFromCart: (pokemon: Pokemon) => {
            const cartItem = state.cart().find(item => item.product.id === pokemon.id);
            if (!cartItem) {
                return;
            }

            patchState(
                state,
                { cart: state.cart().filter(item => item.product.id !== pokemon.id) }
            )
            patchState(
                state,
                updateEntity({ id: pokemon.id, changes: { quantity: pokemon.quantity + cartItem.quantity } })
            );
        },
        clearCart: () => {
            state.cart().forEach(cartItem => {
                patchState(
                    state,
                    updateEntity({ id: cartItem.product.id, changes: { quantity: cartItem.product.quantity + cartItem.quantity } })
                );
            });
            patchState(state, { cart: [] });
        },
        selectPokemon: (pokemon: Pokemon) => patchState(state, { selectedPokemon: pokemon }),
        clearPokemonSelection: () => patchState(state, { selectedPokemon: undefined }),
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
    }),
);