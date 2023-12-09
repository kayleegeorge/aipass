# aipass

BYOK (bring your own key) wallet & SDK

**Chrome Extension Flow** 

(1) SIGN-UP: create aiPass master key

![Screen Shot 2023-12-06 at 5.17.44 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/6033cf94-37ea-4ad0-82d9-5ac3714bfbc0/Screen_Shot_2023-12-06_at_5.17.44_PM.png)

![Screen Shot 2023-12-06 at 5.18.17 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/8ed846ba-d42f-4944-bb9e-6a021238df3d/Screen_Shot_2023-12-06_at_5.18.17_PM.png)

(2) LOGIN: enter master key

![Screen Shot 2023-12-06 at 5.18.30 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/1f8124fd-428e-4a26-ac1c-f9f3653b00a5/Screen_Shot_2023-12-06_at_5.18.30_PM.png)

(3) KEY MANAGEMENT

**[CURRENT]**

- saves all API keys securely, protected by master key (can copy directly from wallet into AI apps)

![Screen Shot 2023-12-07 at 4.35.08 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/189cceaa-f861-4ba4-9387-52caf5bf1024/Screen_Shot_2023-12-07_at_4.35.08_PM.png)

- Personal keys & group keys (i.e. vault)
    - personal keys for personal use
    - group keys (shared with other people)
        - can securely invite people to use these keys (i.e. add people to your group)

![Screen Shot 2023-12-08 at 1.11.56 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/6a6896af-b638-40cb-bd68-f28a393634c1/Screen_Shot_2023-12-08_at_1.11.56_PM.png)

**[POC with balance add]** *(*not possible now)*

- SDK for AI app developer // If have not visited AI app before, “connect to wallet” option on AI app web app (i.e. ) —> spawns aiPass connection

![Screen Shot 2023-12-08 at 1.22.15 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/8cc1f4b7-83b7-4f45-9fb7-50319c06cb3b/Screen_Shot_2023-12-08_at_1.22.15_PM.png)

![Screen Shot 2023-12-06 at 5.01.10 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/5f46871c-9d62-4ab4-8494-32276f26b70f/Screen_Shot_2023-12-06_at_5.01.10_PM.png)

- automatically connects to AI app with correct API key

![Screen Shot 2023-12-06 at 5.19.00 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/6d6f3830-ce4e-45da-9576-4b95ef49c705/Screen_Shot_2023-12-06_at_5.19.00_PM.png)

- Connected AI app <> aiPass wallet example

![Screen Shot 2023-12-06 at 5.19.17 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/3ffeda26-27fa-468d-8968-a1e7778bdf25/ad8c4fc4-6364-4952-9119-0e816c8d5778/Screen_Shot_2023-12-06_at_5.19.17_PM.png)

- Usage info
    - shows usage rate for product AI usage
- Manage keys:
    - can edit usage limits, copy keys from aiPass wallet, add new keys (manual entry)
    - keys are stored in local storage and encrypted with master key
- Manage funds
    - add more funds to your aiPass wallet

[More Information](https://zenith-haze-1a9.notion.site/aiPass-046adff417e441a7923ddc460a533988?pvs=4)
