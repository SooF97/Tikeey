//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Tikeey is ERC721URIStorage {
    // variable for event Ids and ticket Ids
    uint256 public eventId;
    uint256 public ticketId;

    address payable contractOwner;

    constructor() ERC721("Tikeey", "TCKT") {
        contractOwner = payable(msg.sender);
    }

    // event data
    struct evenement {
        uint256 eventid;
        address payable organizer;
        string eventTitle;
        string eventDescription;
        string eventImageUri;
        string[] eventTicketsUri;
        uint256 eventSupply;
        uint256 ticketPrice;
        uint256 limitToBuy;
        uint256 ticketsSold;
        string dateAndTime;
        string eventLocation;
        bool eventAvailability;
    }

    mapping(uint256 => evenement) public eventMapping;
    mapping(string => uint256) public eventToId;

    evenement[] public eventArray;

    // function to create events
    function createEvent(
        string memory _eventTitle,
        string memory _eventDescription,
        string memory _eventImageUri,
        string[] memory _eventTicketsUri,
        uint256 _eventSupply,
        uint256 _ticketPrice,
        uint256 _limitToBuy,
        string memory _dateAndTime,
        string memory _eventLocation
    ) public {
        eventId++;
        eventMapping[eventId] = evenement(
            eventId,
            payable(msg.sender),
            _eventTitle,
            _eventDescription,
            _eventImageUri,
            _eventTicketsUri,
            _eventSupply,
            _ticketPrice,
            _limitToBuy,
            0,
            _dateAndTime,
            _eventLocation,
            true
        );
        eventArray.push(eventMapping[eventId]);
        eventToId[_eventTitle] = eventId;
    }

    // function to fetch events created
    function fetchAvailableEvents() public view returns (evenement[] memory) {
        uint256 counter;
        uint256 index = 0;
        for (uint256 i = 0; i < eventArray.length; i++) {
            if (eventArray[i].eventAvailability) {
                counter++;
            }
        }
        evenement[] memory availableCreatedEvents = new evenement[](counter);
        for (uint256 j = 0; j < eventArray.length; j++) {
            if (eventArray[j].eventAvailability) {
                availableCreatedEvents[index] = eventArray[j];
                index++;
            }
        }
        return availableCreatedEvents;
    }

    // function to fetch myEvents created
    function myCreatedEvents() public view returns (evenement[] memory) {
        uint256 counter;
        uint256 index;
        for (uint256 i = 0; i < eventArray.length; i++) {
            if (eventArray[i].organizer == msg.sender) {
                counter++;
            }
        }
        evenement[] memory myEvents = new evenement[](counter);
        for (uint256 j = 0; j < eventArray.length; j++) {
            if (eventArray[j].organizer == msg.sender) {
                myEvents[index] = eventArray[j];
                index++;
            }
        }
        return myEvents;
    }

    // function to fetch myEvents finished / sold out
    function myFinishedEvents() public view returns (evenement[] memory) {
        uint256 counter;
        uint256 index;
        for (uint256 i = 0; i < eventArray.length; i++) {
            if (
                !eventArray[i].eventAvailability &&
                eventArray[i].organizer == msg.sender
            ) {
                counter++;
            }
        }
        evenement[] memory myEvents = new evenement[](counter);
        for (uint256 j = 0; j < eventArray.length; j++) {
            if (
                !eventArray[j].eventAvailability &&
                eventArray[j].organizer == msg.sender
            ) {
                myEvents[index] = eventArray[j];
                index++;
            }
        }
        return myEvents;
    }

    // function to allow customers to purchase the desired number of tickets
    function buyTickets(
        uint256 _eventId,
        uint256 _numberOfTicketToBuy
    ) public payable {
        require(
            eventMapping[_eventId].eventAvailability,
            "Event not available!"
        );
        require(
            _numberOfTicketToBuy <= eventMapping[_eventId].limitToBuy,
            "You exceed the amount allowed to purchase!"
        );
        require(
            _numberOfTicketToBuy <=
                eventMapping[_eventId].eventSupply -
                    eventMapping[_eventId].ticketsSold,
            "Change the number of tickets to purchase!"
        );
        uint256 totalPrice = eventMapping[_eventId].ticketPrice *
            _numberOfTicketToBuy;
        require(
            msg.value == totalPrice,
            "Please, pay the exact price to complete the purchase!"
        );
        for (uint256 i = 0; i < _numberOfTicketToBuy; i++) {
            ticketId++;
            _safeMint(msg.sender, ticketId);
            uint256 index = eventMapping[_eventId].eventTicketsUri.length - 1;
            _setTokenURI(
                ticketId,
                eventMapping[_eventId].eventTicketsUri[index]
            );
            eventMapping[_eventId].ticketsSold++;
            eventArray[_eventId - 1].ticketsSold++;
            if (
                eventMapping[_eventId].ticketsSold ==
                eventMapping[_eventId].eventSupply
            ) {
                eventMapping[_eventId].eventAvailability = false;
                eventArray[_eventId - 1].eventAvailability = false;
            }
            eventMapping[_eventId].eventTicketsUri.pop();
        }
        (bool success1, ) = eventMapping[_eventId].organizer.call{
            value: (2 * (msg.value)) / 100
        }("");
        require(success1, "Transferring funds to event organizer failed!");
        (bool success2, ) = payable(contractOwner).call{
            value: (98 * (msg.value)) / 100
        }("");
        require(success2, "Transferring funds to contract owner failed!");
    }
}
