export type AppUser = {
    id: string,
    username: string,
    email: string,
    role: "USER" | "ADMIN",
    registrationDate: string,
}