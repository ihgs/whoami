public interface User {
    mail: string;
    name: string;
}

public interface IDatabase {
    save: (id: string, datum: any)=>any
}