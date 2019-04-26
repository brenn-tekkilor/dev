import { Register } from './register';
export class Store {
    public storeId: number;
    public name: string;
    public addressLine1: string;
    public phoneNumber: string;
    public geoZipCode: number;
    public isActive: boolean;
    public taxRetail: number;
    public taxFood: number;
    public geoCity: string;
    public banner: string;
    public geoState: string;
    public latitude: number;
    public longitude: number;
    public registers: Register[] = [];
}
