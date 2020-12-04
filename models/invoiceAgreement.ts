import {Seller} from "~/models/seller";

export default class InvoiceAgreement {
    public id: number = 0;
    public clubId: number = 0;
    public sellerId: number = 0;
    public thirdPartyVatPercentage: number = 0;
    public paymentHandlingPercentage: number = 0;
    public shippingInsurancePercentage: number = 0;
    public shippingFlatFee: number = 0;
    public mwsHandlingPercentage: number = 0;
    public mwsAuctionPercentage: number = 0;
    public mwsVatPercentage: number = 0;
    public mwsSetupFee: number = 0;
    public seller: Seller = new Seller();
}
