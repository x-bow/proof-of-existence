# Design Pattern Decisions

* Have used uPort to log into the application. This way users are in total control of their identity.
* Have used IPFS to store data so it stored in distributed system and can be publicly verified.
* Application, itself, is hosted in IPFS so it is truely decentraliced from end to end.

## Cirtuit Breaker (Emergency Stop)
* Have used standard Pausable and Ownable contracts from OpenZeppelin so only the owner of the contract can pause the contract.

## Restricting Access
* State variables are made private where applicable.

## Circuit Breaker
* Have added the ability to pause the contract if bugs are encountered.

## Mortal
* Owner of the contract has the ability to destroy the contract.

