import {ShippingStatusEnum} from "~/enums/shippingStatus.ts";

export class Order {
    public PlayerName: string = '';
    public PlayerID: number = 0;
    public ProductPrice: number = 0;
    public ProductID: number = 0;
    public UserID: number = 0;
    public UserName: string = '';
    public UserMail: string = '';
    public UserPhoneNumber: string = '';
    public UserAddress: string = '';
    public UserPostCode: string = '';
    public UserCity: string = '';
    public UserCountry: string = '';
    public UserCompany: string = '';
    public OrderShirtPaid: boolean = false;
    public OrderFramePaid: boolean = false;
    public OrderFraming: boolean = false;
    public OrderFramingStatus: number = 0;
    public OrderPaymentReminder: number = 0;
    public OrderAddressReminder: number = 0;
    public OrderShippingCosts: number = 0;
    public OrderPaymentCosts: number = 0;
    public OrderShippingStatus: ShippingStatusEnum = ShippingStatusEnum.Pending;
    public OrderID: number = 0;
    public OrderCreationDate: string = '';
    public OrderCertificateNumber: number = 0;
    public OrderNotes: string = '';
    public OrderFramingPurchaseOptionsID: number = 0;
    public MatchID: number = 0;
    public MatchDate: string = '';
    public ClubName: string = '';
    public ClubID: number = 0;

    constructor() {}
}
