import { create } from 'zustand';

export const useConfiguratorStore = create((set) => ({
    // Dimensions in mm
    width: 2000,
    height: 2400,
    depth: 600,
    modules: 3,

    // Material
    melamine: 'roble_nordico',
    thickness: 18,

    // Customer data
    customer: {
        name: '',
        whatsapp: '',
        email: '',
    },

    // Quote
    quote: null,

    // Advanced Config
    hasDoors: true,
    doorsOpen: false,
    internalConfig: {}, // { moduleIndex: 'type' } e.g. {0: 'shelves', 1: 'drawers'}

    // Actions
    setDimension: (key, value) => set((state) => {
        const updates = { [key]: value };
        // Reset/Adjust internal config if modules change? 
        // For simplicity, we keep existing keys. Components will handle missing ones as defaults.
        return updates;
    }),
    setMelamine: (melamine) => set({ melamine }),
    setThickness: (thickness) => set({ thickness }),
    setHasDoors: (hasDoors) => set({ hasDoors, doorsOpen: false }), // Close if toggling existence
    setDoorsOpen: (doorsOpen) => set({ doorsOpen }),
    setModuleType: (index, type) => set((state) => ({
        internalConfig: { ...state.internalConfig, [index]: type }
    })),
    setCustomer: (customer) => set({ customer }),
    setQuote: (quote) => set({ quote }),

    reset: () => set({
        width: 2000,
        height: 2400,
        depth: 600,
        modules: 3,
        melamine: 'roble_nordico',
        thickness: 18,
        hasDoors: true,
        doorsOpen: false,
        internalConfig: {},
        customer: { name: '', whatsapp: '', email: '' },
        quote: null,
    }),
}));
