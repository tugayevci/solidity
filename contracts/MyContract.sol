// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract MyContract {
    struct Nft {
        uint256 id;
        string name;
        string desc;
        string image;
        uint256 price;
        address owner;
    }

    Nft[] public nfts;

    constructor(string memory _name) {
        nfts.push(
            Nft(
                0,
                "Bulbasaur",
                "There is a plant seed on its back right from the day this Pokemon is born. The seed slowly grows larger",
                "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
                0.01 ether,
                address(0)
            )
        );
        nfts.push(
            Nft(
                1,
                "Charmander",
                "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
                "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
                0.02 ether,
                address(0)
            )
        );
        nfts.push(
            Nft(
                2,
                "Squirtle",
                "When it retracts its long neck into its shell, it squirts out water with vigorous force",
                "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
                0.01 ether,
                address(0)
            )
        );
        nfts.push(
            Nft(
                3,
                "Pidgey",
                "Very docile. If attacked, it will often kick up sand to protect itself rather than fight back.",
                "https://assets.pokemon.com/assets/cms2/img/pokedex/full/016.png",
                0.01 ether,
                address(0)
            )
        );
        nfts.push(
            Nft(
                4,
                "Ekans",
                "The older it gets, the longer it grows. At night, it wraps its long body around tree branches to rest",
                "https://assets.pokemon.com/assets/cms2/img/pokedex/full/023.png",
                0.03 ether,
                address(0)
            )
        );
        nfts.push(
            Nft(
                5,
                "Pikachu",
                "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
                "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
                0.5 ether,
                address(0)
            )
        );
    }

    function mintNft(uint256 _id) public payable {
        Nft storage nft = nfts[_id];
        require(msg.value >= nft.price, "Need to pay up!");
        nfts[_id].owner = msg.sender;
    }

    function getNfts() public view returns (Nft[] memory) {
        return nfts;
    }
}
