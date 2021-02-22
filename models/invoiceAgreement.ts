export default class InvoiceAgreement {
  public clubId: number = 0;
  public sellerId: number = 0;
  public name: string = "Default";
  public thirdPartyVatPercentage: string | number = "";
  public paymentHandlingPercentage: number = 1.5;
  public shippingInsurancePercentage: number = 1;
  public shippingFlatFee: number = 50;
  public minimumGuarantee: number = 0;
  public mwsHandlingPercentage: number = 21;
  public mwsAuctionPercentage: number = 21;
  public mwsVatPercentage: number = 21;
  public mwsSetupFee: number = 0;
  public mwsSetupFeeType: SetupFeeType = SetupFeeType["per match"];
  public unpaidProductGuarantee: number = 89;
}

export enum SetupFeeType{
  'per match',
  'per season',
  'first match free',
}