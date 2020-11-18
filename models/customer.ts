import { customerStatusEnum } from "~/enums/customerStatus.ts";

export class Customer {
    public id: number = 1100;
    public name: string = '';
    public email_address: string = '';
    public phone_number: string = '';
    public country: string = '';
    public postal_code: string = '';
    public city: string = '';
    public address: string = '';
    public company: string = '';
    public creation_date: string = '';
    public currency: string = '';
    public forgot_password_date: string = '';
    public email_unsubscribed:false = false;
    public email_verified: boolean = false;
    public other_club_notifs: boolean = false;
    public payment_verified: boolean = false;
    public phone_verified: boolean = false;
    public recurring: boolean = false;
    public status: customerStatusEnum = customerStatusEnum.None;

    public vat_number: string = '';
    public address2: string = '';
    public billing_address1: string = '';
    public billing_address2: string = '';
    public billing_postalcode: string = '';
    public billing_city: string = '';


    constructor() {
        this.setId();
        this.setDate();
    }

    private setId(): void {
        const date = new Date();
        this.id = date.getTime();
    }

    private setDate(): void {
        const today = new Date().toDateString()
        this.creation_date = today;
        this.forgot_password_date = today;
    }
}
