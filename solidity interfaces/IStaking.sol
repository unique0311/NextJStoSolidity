//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface IStaking {  

    struct User {
        uint entreeTokens;
        uint64 entreeTimestamp;
        uint64 unstakeTimestamp;
        bool eligibleForRewards;
    }

        // State variables
    function payoutPercent() external view returns(uint32);
    function dayDenom() external view returns(uint32);
    function superMultiplier() external view returns(uint32);
    function superRewardsFrequency() external view returns(uint32);
    function drawCounter() external view returns(uint);
    function numberOfUsers() external view returns(uint);
    function publisherQuota() external view returns(uint);

    /// @notice Stake function, creates new user, set tokenURI and metadata, and mint Nft to sender.
    /// @dev Requires the sent value to be greater than 0.
    /// @return The token id.
    function stake() external payable returns (uint);

    /// @notice Start unstaking a token.
    /// @dev Requires the sender to be the owner of the token and the unstake timestamp to be initialized.
    /// @param tokenId The token id.
    function startUnstake(uint tokenId) external;

    /// @notice Unstake a token and transfer the staking amount to the token holder.
    /// @dev Requires the token to be valid for unstaking and approved for the contract.
    /// @param tokenId The token id.
    function unstake(uint tokenId) external;

    /// @notice Check the amount needed to start unstaking.
    /// @dev Used in WindfallFactory.sol, realistically only useful for owner
    /// @param timestamp Only tokens with unstakeTimestamp greater than timestamp will be counted.
    /// @return The total amount and the current timestamp.
    function recentUnstaking(uint timestamp) external view returns (uint, uint);

    /// @notice Function for users to claim their rewards.
    /// @param tokenId The tokenId the user want to claim rewards of.
    function claimRewards(uint tokenId) external;

    /// @notice Function to check the rewards for an input address.
    /// @param tokenId The token to check the rewards of.
    function checkRewards(uint tokenId) external view returns(uint);

    /// @notice Retrieves the metadata for a specific tokenId.
    /// @param tokenId The ID of the token.
    /// @return The metadata associated with the given tokenId.
    function getMetadata(uint tokenId) external view returns (string memory);
    /// @notice Get the balance of the contract.
    /// @return The balance of the contract.
    function getContractBalance() external view returns (uint);

    /// @notice Publish the winning address and distribute the winning amount.
    /// @param winningToken Token to be attributed rewards
    /// @param winningAmount Amount to be acredited to winningToken
    /// @param randomNumber The random number that was used to pull rewards
    function publishWinner(uint winningToken, uint winningAmount, uint randomNumber) external;

    /// @notice Pick the winning address and the winning amount. 
    /// @dev Computation requires too much gas as number of users increases
    /// @param salt A random value input at function call to add randomness to the generated number.
    function pickWinner(uint salt) external view returns (uint, uint, uint);

    /// @notice Get the amount to be distributed as the daily winning amount.
    /// @param condition A boolean, true if super rewards, false if normal rewards
    /// @return The amount to be distributed as the winning amount.
    /// @return The valid staking amount for the condition value
    function getWinningAmount(bool condition) external view returns (uint, uint);

    /// @notice Get the user data for a specific token ID.
    /// @dev Retrieves the user struct for the given token ID.
    /// @param _index The user index.
    /// @return The user struct containing staking amount, staking status, stake timestamp, and unstake timestamp.
    function getUserByNftId(uint _index) external view returns (User memory);

    /// @notice Function that returns true if the next publishWinningAddress is the super rewards
    /// @return True if super rewards, false otherwise. 
    function isSuper() external view returns (bool);

    /// @notice Function to return data needed for the front end
    /// @return frontendData An encoded bytes variable for variables (bool, uint32, uint, uint, uint, uint[7] memory, uint[7] memory)
    /// Vars: (superRewards, superMultiplier, dayAmount, weekAmount, totalStaked, winningAmounts, winningTokens)
    function getFrontendData() external view returns (bytes memory);

        // Admin Functions:

    /// @notice Function to set the payout percentage after deployment.
    /// @param _payoutPercent The new payout percentage.
    /// @dev Contract is non-upgradable so some changes can be made without needing new contract
    function setPayoutPercent(uint32 _payoutPercent) external payable;


    /// @notice Function to set the dayDenom and weekDenom values.
    /// @param _dayDenom The new value for dayDenom.
    /// @param _superMultiplier The new value for weekDenom.
    /// @dev Contract is non-upgradable so some changes can be made without needing new contract
    function setDenoms(uint32 _dayDenom, uint32 _superMultiplier) external payable;

    /// @notice Function to set the super reward frequency after deployment.
    /// @param _superRewardsFrequency The new super reward frequency.
    /// @dev Contract is non-upgradable so some changes can be made without needing new contract
    function setSuperRewardFrequency(uint32 _superRewardsFrequency) external payable;

    /// @notice Withdraw tokens from contract, needed since automatic staking/unstaking to node not currently possible,
    /// @dev This function allows users with admin or safety roles to withdraw tokens from the contract manually.
    /// @param _amount The amount of tokens to withdraw.
    function withdrawTokens(uint _amount) external payable;

    /// @notice Deposit tokens into the contract.
    /// @dev This function allows users to deposit tokens into the contract
    /// @dev Intended use is for owner to deposit the unstaked funds into contract after 21 day wait period
    function depositTokens() external payable;

    /// @notice Function to calculate the amounts of staking/unstaking of the contract
    /// @dev This function is for administration to determine how much to start unstaking etc
    /// @return An uint array amounts[Eligible for rewards, Ineligible for rewards, winnerRewards total, Can unstake]
    function calculateAmounts() external view returns (uint[] memory);

    /// @notice A function to snapshot eligible NFTs
    /// @dev Used to help make the off chain calculation more transparent 
    /// @return A uint array of valid NFTs and their amounts
    function snapshot() external view returns (uint[] memory);

}