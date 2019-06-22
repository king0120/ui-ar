import { IProject } from "./IProject";

export interface IOrganization {
  projects: IProject[];
  id: number;
  name: string;
  shortName: string;
  contactFirstName: string;
  contactLastName: string;
  disabledByAdmin: string;
  disabledReason: string;
  orgAddress1: string;
  orgAddress2: string;
  orgCity: string;
  orgState: string;
  orgProvince: string;
  orgZip: string;
  orgPhone1: string;
  orgPhone2: string;
  orgWebsite: string;
  orgFacebook: string;
  orgLinkedIn: string;
  orgPinterest: string;
  orgTwitter: string;
  orgInstagram: string;
  oontractsOfferred: string;
  textMessagePhone1: string;
  generalTextId: number
  editTextId: number
  paidSubscriber: string;
  paymentName: string;
  paymentPhone: string;
  paymentAddress1: string;
  paymentAddress2: string;
  paymentCity: string;
  paymentState: string;
  paymentZip: string;
  properties: string;
  actionAlerts: string;
  smallPhotoGUID: string;
  largePhotoGUID: string;
  textMessagesAllowed: number
  textMessagesUsed: number
}