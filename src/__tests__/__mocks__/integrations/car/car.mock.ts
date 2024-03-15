export const carMock = {
    name: "Gol",
    description: "Geração 5",
    brand: "WV",
    year: 2015,
    km: 150000,
}

export const carInvalidMock = {
    name: 1 || false,
    description: 2 || true,
    brand: 4 || false,
    year: "2015" || true,
    km: "150000" || false,
}


export const carUpdatedMock = {
    name: "Gol" || undefined,
    description: "Geração 5" || undefined,
    brand: "WV" || undefined,
    year: 2015 || undefined,
    km: 150000 || undefined,
}