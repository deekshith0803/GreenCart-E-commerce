import { useState } from "react"
import { assets } from "../assets/assets"

const InputField = ({ type, placeholder, name, handileChange, address }) => (
    <input type={type}
        placeholder={placeholder}
        name={name}
        onChange={handileChange}
        value={address[name]}
        required
        className="w-full px-2 py-2.5 border border-gray-300/30 rounded outline-none text-gray-500 focus:border-primary transition"
    />
)
const AddAddress = () => {

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
    })

    const handileChange = ((e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="mt-5 pb-5">
            <p className="text-2xl md:text-3xl text-gray-500">Add Shipping
                <span className="text-primary font-semibold"> Address</span>
            </p>
            <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
                <div className="flex-1 max-w-md">
                    <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm" >
                        <div className="grid grid-cols-2 gap-4">
                            <InputField handileChange={handileChange} address={address} type="text" placeholder="First Name" name="firstName" />
                            <InputField handileChange={handileChange} address={address} type="text" placeholder="Last Name" name="lastName" />
                        </div>

                        <InputField handileChange={handileChange} address={address} type="email" placeholder="Email Address" name="email" />
                        <InputField handileChange={handileChange} address={address} type="text" placeholder="Street" name="street" />

                        <div className="grid grid-cols-2 gap-4">
                            <InputField handileChange={handileChange} address={address} type="text" placeholder="City" name="city" />
                            <InputField handileChange={handileChange} address={address} type="text" placeholder="State" name="state" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <InputField handileChange={handileChange} address={address} type="text" placeholder="PIN code" name="pincode" />
                            <InputField handileChange={handileChange} address={address} type="text" placeholder="Cuntry" name="cuntry" />
                        </div>

                        <InputField handileChange={handileChange} address={address} type="text" placeholder="Phone Number" name="phone" />

                        <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition coursor-pointer uppercase">Save Address</button>

                    </form>
                </div>
                <img className="md:mr-16 mb-16 md:mt-0" src={assets.add_address_iamge} alt="Add Address" />
            </div>
        </div>
    )
}

export default AddAddress
