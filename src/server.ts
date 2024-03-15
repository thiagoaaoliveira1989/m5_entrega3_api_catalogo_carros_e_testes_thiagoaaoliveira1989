import { app } from "./app";

const PORT: number = Number(process.env.PORT) || 3001;

app.listen(PORT, () => {
    console.log(`Api Started on port ${PORT}`);
})