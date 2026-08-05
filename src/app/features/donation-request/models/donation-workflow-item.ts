import type { DonationType } from "../enums/donation-type.enum";

export interface DonationWorkflowItem {

    hospitalId: string;

    hospitalName: string;

    donationPlanId: string;

    donationName: string;

    donationAmount?: number;

    donationType?: DonationType;

    donationStartDate?: string;

    donationEndDate?: string | null;

}