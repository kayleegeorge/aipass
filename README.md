# aipass

"MetaMask for AI": Bring your own key (BYOK) wallet & SDK. 

**Chrome Extension Flow** 

(1) SIGN-UP: create aiPass master key
<img width="771" alt="Screen Shot 2023-12-08 at 11 35 23 PM" src="https://github.com/kayleegeorge/aipass/assets/62825936/a64c7858-d0d4-4878-b2af-47940c40ca44">

(2) LOGIN: enter master key

<img width="502" alt="Screen Shot 2023-12-08 at 11 35 42 PM" src="https://github.com/kayleegeorge/aipass/assets/62825936/e540e7d7-1f49-44ea-bf7a-ff2672abc9c4">

(3) KEY MANAGEMENT

**[CURRENT]**

- saves all API keys securely, protected by master key (can copy directly from wallet into AI apps)
- Personal keys & group keys (i.e. vault)
    - personal keys for personal use
    - group keys (shared with other people)
        - can securely invite people to use these keys (i.e. add people to your group)
    
<img width="781" alt="Screen Shot 2023-12-08 at 11 36 16 PM" src="https://github.com/kayleegeorge/aipass/assets/62825936/86f92a97-a7ab-434d-b51e-2d2b357cc982">


**[POC with balance add]**

- SDK for AI app developer // If have not visited AI app before, “connect to wallet” option on AI app web app to spawns aiPass connection
  
<img width="752" alt="Screen Shot 2023-12-08 at 11 37 09 PM" src="https://github.com/kayleegeorge/aipass/assets/62825936/6a239756-d391-4702-a942-cba4c66c7a7c">

- automatically connects to AI app with correct API key (Connected AI app <> aiPass wallet example)
  
<img width="662" alt="Screen Shot 2023-12-08 at 11 37 34 PM" src="https://github.com/kayleegeorge/aipass/assets/62825936/85f1b47f-37e8-4c9a-85c5-16555c80d7a0">

- Wallet features
    - Usage info
        - shows usage rate for product AI usage
    - Manage keys:
        - can edit usage limits, copy keys from aiPass wallet, add new keys (manual entry)
        - keys are stored in local storage and encrypted with master key
    - Manage funds
        - add more funds to your aiPass wallet

<img width="778" alt="Screen Shot 2023-12-08 at 11 38 08 PM" src="https://github.com/kayleegeorge/aipass/assets/62825936/9f9cc94f-55d1-4d6f-b269-2fad1aeed418">

[More Information](https://zenith-haze-1a9.notion.site/aiPass-046adff417e441a7923ddc460a533988?pvs=4)
