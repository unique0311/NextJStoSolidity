//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

interface IWinToken {

    /// @notice Mint a new token to the specified address.
    /// @dev MINTER role required, Staking.sol should be the only MINTER
    /// @param to The address to mint the token to.
    function safeMint(address to) external;

    /// @dev Get the next available token ID to be minted.
    function getNextTokenId() external view returns (uint256);

    /// @notice Check if a token with the given ID exists.
    /// @param tokenId The ID of the token to check.
    /// @return True if the token exists, otherwise false.
    function exists(uint256 tokenId) external view returns (bool);

    /// @notice Check if a spender is approved to manage the given token.
    /// @param spender The address to check for approval.
    /// @param tokenId The ID of the token.
    /// @return True if the spender is approved, false otherwise.
    function isApproved(address spender, uint256 tokenId) external view returns (bool);

    /**
     * @dev See {IERC721-ownerOf}.
     */
    function ownerOf(uint256 tokenId) external view returns (address);

    /**
     * @dev See {IERC721-balanceOf}.
     */
    function balanceOf(address owner) external view returns (uint256);

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Burns `tokenId`. See {ERC721-_burn}.
     *
     * Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function burn(uint256 tokenId) external;

    // See {ERC721-safeTransferFrom}.
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    
    /// @notice Function to find which tokens an address owns.
    /// @dev Only needed for deployment on chains that don't support retrieving token ownership easily. 
    /// @dev Gas intensive, should not be used in write functions
    function getTokensOfOwner(address owner) external view returns (uint[] memory);
}