import { getConnection, Repository } from "typeorm";
import { Address } from "../entities/Address";

export class AddressRepository extends Repository<Address>{
    public async createAddress( addrDetails : Address ){
        const addrConnection = getConnection().getRepository(Address);
        const saveDetails = await addrConnection.save(addrDetails);
        return saveDetails;
    }

    public async getAllAddress(){
        const addrConnection = getConnection().getRepository(Address);
        return addrConnection.findAndCount();
    }
}