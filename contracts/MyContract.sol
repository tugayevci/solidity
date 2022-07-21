// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract MyContract {
    string private name;

    event ChangeName(address indexed _from, string indexed _name);

    constructor(string memory _name) {
        name = _name;
    }

    function changeName(string memory _name) public {
        name = _name;
        emit ChangeName(msg.sender, _name);
    }

    function getName() public view returns (string memory) {
        return name;
    }
}
