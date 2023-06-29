export class Profile {
    id: number;
    name: string;
    age: number;
    profilepic: string;
    address: {
      id: number;
      addressLine1: string;
      addressLine2: string;
      city: string;
      state: string;
      pinCode: number;
    };
    mobileNumber: number;
    emailId: string;
    bio: string;
    bankAccount: {
      id: number;
      accountHolderName: string;
      accountNumber: string;
      ifscCode: string;
    };
    role: string;
  
    constructor(
      id: number,
      name: string,
      age: number,
      profilepic: string,
      address: {
        id: number;
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        pinCode: number;
      },
      mobileNumber: number,
      emailId: string,
      bio: string,
      bankAccount: {
        id: number;
        accountHolderName: string;
        accountNumber: string;
        ifscCode: string;
      },
      role: string
    ) {
      this.id = id;
      this.name = name;
      this.age = age;
      this.profilepic = profilepic;
      this.address = address;
      this.mobileNumber = mobileNumber;
      this.emailId = emailId;
      this.bio = bio;
      this.bankAccount = bankAccount;
      this.role = role;
    }
  }


  
  
 