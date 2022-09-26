import {
  ContractTransaction,
  ContractInterface,
  BytesLike as Arrayish,
  BigNumber,
  BigNumberish,
} from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<
  VehicleMarketplaceContract,
  VehicleMarketplaceContractMethodNames,
  VehicleMarketplaceContractEventsContext,
  VehicleMarketplaceContractEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type VehicleMarketplaceContractEvents = 'Cancel' | 'OnSale' | 'Sold';
export interface VehicleMarketplaceContractEventsContext {
  Cancel(...parameters: any): EventFilter;
  OnSale(...parameters: any): EventFilter;
  Sold(...parameters: any): EventFilter;
}
export type VehicleMarketplaceContractMethodNames =
  | 'new'
  | 'listedItemsCount'
  | 'isVehicleOnSale'
  | 'putVehicleOnSale'
  | 'getVehicleSaleTicket'
  | 'buyVehicle'
  | 'cancelSale';
export interface CancelEventEmittedResponse {
  ticketId: BigNumberish;
  seller: string;
  vehicleId: BigNumberish;
}
export interface OnSaleEventEmittedResponse {
  ticketId: BigNumberish;
  seller: string;
  tokenContract: string;
  vehicleId: BigNumberish;
  price: BigNumberish;
}
export interface SoldEventEmittedResponse {
  ticketId: BigNumberish;
  buyer: string;
  tokenContract: string;
  vehicleId: BigNumberish;
  price: BigNumberish;
}
export interface SaleticketResponse {
  seller: string;
  0: string;
  tokenContract: string;
  1: string;
  vehicleId: BigNumber;
  2: BigNumber;
  price: BigNumber;
  3: BigNumber;
  status: number;
  4: number;
}
export interface VehicleMarketplaceContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param VRTAddress Type: address, Indexed: false
   */
  'new'(
    VRTAddress: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  listedItemsCount(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param vehicleId Type: uint256, Indexed: false
   */
  isVehicleOnSale(
    vehicleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param vehicleId Type: uint256, Indexed: false
   * @param price Type: uint256, Indexed: false
   */
  putVehicleOnSale(
    vehicleId: BigNumberish,
    price: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param vehicleId Type: uint256, Indexed: false
   */
  getVehicleSaleTicket(
    vehicleId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<SaleticketResponse>;
  /**
   * Payable: true
   * Constant: false
   * StateMutability: payable
   * Type: function
   * @param vehicleId Type: uint256, Indexed: false
   */
  buyVehicle(
    vehicleId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vehicleId Type: uint256, Indexed: false
   */
  cancelSale(
    vehicleId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
