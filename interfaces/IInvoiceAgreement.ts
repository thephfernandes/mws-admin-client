import {ISeller} from "~/interfaces/ISeller";

export interface IInvoiceAgreement {
    id: number;
    name: string;
    clubId: number;
    sellerId: number;
    thirdPartyVatPercentage: number;
    paymentHandlingPercentage: number;
    shippingInsurancePercentage: number;
    shippingFlatFee: number;
    minimumGuarantee: number;
    mwsHandlingPercentage: number;
    mwsAuctionPercentage: number;
    mwsVatPercentage: number;
    mwsSetupFee: number;
    seller: ISeller;
}
