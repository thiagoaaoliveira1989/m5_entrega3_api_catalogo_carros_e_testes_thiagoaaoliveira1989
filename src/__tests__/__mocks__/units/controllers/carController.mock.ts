export const carControllerMock = {
    body: {
        name: "Gol",
        description: "Geração 5",
        brand: "WV",
        year: 2015,
        km: 150000,
    },

    updateBody: {
        name: "Gol" || undefined,
        description: "Geração 5" || undefined,
        brand: "WV" || undefined,
        year: 2015 || undefined,
    },

    expectedValue: {
        id: expect.any(String),
        name: "Gol",
        description: "Geração 5",
        brand: "WV",
        year: 2015,
        km: 150000,
    },
};

