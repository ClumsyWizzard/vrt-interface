import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { VehicleMarketplaceContract } from "@_types/VehicleMarketplaceContract";
import { VehicleRegistrationTokenContract } from "@_types/VehicleRegistrationTokenContract";

const pageReload = () => {
    window.location.reload();
};

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
    const isLocked = !(await ethereum._metamask.isUnlocked());
    if (isLocked) {
        pageReload();
    }
};

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("chainChanged", pageReload);
    ethereum.on("accountsChanged", handleAccount(ethereum));
};

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum?.removeListener("chainChanged", pageReload);
    ethereum?.removeListener("accountsChanged", handleAccount);
};

const Web3Context = createContext<Web3State>(createDefaultState());

const Web3Provider: FunctionComponent = ({ children }) => {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

    useEffect(() => {
        async function initWeb3() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum as any);
                const vehicleMarketplaceContract = await loadContract("VehicleMarketplace", provider);
                const vehicleVehicleRegistrationTokenContract = await loadContract(
                    "VehicleRegistrationToken",
                    provider
                );

                const signer = provider.getSigner();
                const signedVehicleMarketplaceContract = vehicleMarketplaceContract.connect(signer);
                const signedVehicleRegistrationTokenContract = vehicleVehicleRegistrationTokenContract.connect(signer);

                setTimeout(() => setGlobalListeners(window.ethereum), 500);
                setWeb3Api(
                    createWeb3State({
                        ethereum: window.ethereum,
                        provider,
                        contracts: {
                            vehicleRegistrationTokenContract:
                                signedVehicleRegistrationTokenContract as unknown as VehicleRegistrationTokenContract,
                            vehicleMarketplaceContract:
                                signedVehicleMarketplaceContract as unknown as VehicleMarketplaceContract,
                        },
                        isLoading: false,
                    })
                );
            } catch (e: any) {
                console.error(e, "Please, install web3 wallet");
                setWeb3Api((api) =>
                    createWeb3State({
                        ...(api as any),
                        isLoading: false,
                    })
                );
            }
        }

        initWeb3();
        return () => removeGlobalListeners(window.ethereum);
    }, []);

    return <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>;
};

export function useWeb3() {
    return useContext(Web3Context);
}

export function useHooks() {
    const { hooks } = useWeb3();
    return hooks;
}

export default Web3Provider;
