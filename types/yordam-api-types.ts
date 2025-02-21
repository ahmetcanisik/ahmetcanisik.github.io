export interface BookType {
    // Kitap İsmi
    name: string;

    // Kütüphane - Kitabın barındığı kütüphane adı.
    library?: string;

    // Tür - Kitabın türü, Roman, Hikaye vs.
    type?: string;

    // Sınıflama yer bilgisi
    place?: string;

    // Ödünç Sayısı, Kitabın ödünç alınma sayısı.
    loan_count?: number;

    // Alt Biçim
    sub_type?: string;

    // Şekil - Kitabın dış tasarımı, Basılı vs.
    figure?: string;

    // Ortam
    around?: string;

    // Durum
    state?: "Rafta" | "İade tarihi geçmiş";

    // Kopya
    copy?: string;
}

export interface ApiProps {
    query: string;
    page?: number;
    firstRequest?: boolean;
    proxy?: string;
}

export interface AssignNamesType {
    name: string;
    assign: string;
}