import { plainToClass } from "class-transformer";
import { Address } from "../entities/Address";
import { AddressRepository } from "../repository/AddressRepository";

export class AddressService{
    constructor(
        private addrRepository : AddressRepository
    ){}

    public async createAddr(addrInput: any){
        const addrData = plainToClass(Address, {
            "address" : addrInput.address
        });
        const savedDetails = await this.addrRepository.createAddress(addrData);
        return savedDetails;
    }

    public async getAllAddress(){
        return this.addrRepository.getAllAddress();
    }
}