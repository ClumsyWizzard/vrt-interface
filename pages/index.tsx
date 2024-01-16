import type { NextPage } from "next";
import { BaseLayout, NftList } from "@ui";
import { useNetwork } from "@hooks/web3";
import { ExclamationIcon } from "@heroicons/react/solid";

const Home: NextPage = () => {
    const { network } = useNetwork();

    return (
        <BaseLayout>
            <div className="relative pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
                {!network.isConnectedToNetwork ? (
                    <div className="rounded-md bg-yellow-50 p-4 mb-10">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <ExclamationIcon className="h-8 w-8 text-yellow-400" aria-hidden="true" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-yellow-800">Attention</h3>
                                <div className="mt-1 text-normal text-yellow-700">
                                    <p>
                                        {network.isLoading
                                            ? "Loading..."
                                            : `It appears you are connected to the wrong network. Check that you have configured Metamask correctly and connect to the network ${network.targetNetwork}.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className="relative">
                    <div className="text-center">
                        <h2 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl">
                            Vehicle go vroom vroom
                        </h2>
                        <p className="pt-3 text-xl font-light">
                            Vehicle Registration over Blockchain
                        </p>
                    </div>
                    <NftList />
                </div>
            </div>
        </BaseLayout>
    );
};

export default Home;
