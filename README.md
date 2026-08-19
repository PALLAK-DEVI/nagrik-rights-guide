# Citizen Compass AI

Build a complete, polished, responsive full-stack web application called "NagrikAI" — an AI-powered Civic & Legal Rights Navigator for Indian citizens.

IMPORTANT:

This is a hackathon project. Do NOT build a generic AI chatbot. The product must feel like a real civic-tech platform that helps an ordinary citizen understand a civic/legal problem and take the next practical step.

The core product flow is:

Citizen describes a problem in simple language

→ system identifies the type of issue

→ asks for missing information

→ retrieves relevant authoritative information

→ explains the situation in simple language

→ shows supporting sources

→ gives a personalized action plan

→ generates the appropriate document/action

→ allows the citizen to save/download/share the result.

==================================================

1. PRODUCT NAME & BRANDING

==================================================

Product name:

NagrikAI

Tagline:

"Understand your rights. Know your next step."

Secondary tagline:

"Making India's civic and legal information simple, reliable and actionable."

Brand personality:

- trustworthy

- modern

- citizen-friendly

- professional

- transparent

- not intimidating

- not overly corporate

- not like a traditional government portal

Avoid:

- excessive legal imagery

- gavels

- courthouse stock photos

- complicated legal terminology

- flashy gradients everywhere

- childish UI

Use a clean modern civic-tech aesthetic.

Color direction:

- deep navy / blue as the primary brand color

- white/light neutral backgrounds

- subtle green for successful/verified states

- amber for warnings

- red only for critical warnings

- excellent contrast

- accessible typography

Use a modern font such as Inter.

==================================================

2. TARGET USER

==================================================

The target user is an ordinary Indian citizen who may not understand legal or bureaucratic language.

Example users:

- tenant with a deposit dispute

- consumer with a defective product

- citizen wanting to file an RTI

- citizen trying to understand a government scheme

- employee facing a workplace-related issue

The interface must assume the user has little or no legal knowledge.

Use plain English throughout.

The application should eventually support Indian languages, but for the MVP use English and design the architecture so multilingual support can be added later.

==================================================

3. CORE MVP

==================================================

The MVP should focus primarily on these four categories:

1. Consumer Rights

2. Tenant/Rental Issues

3. RTI

4. Government Scheme Eligibility

Do NOT attempt to provide every possible law or government service.

The application should clearly state that it provides informational assistance and is not a substitute for a qualified lawyer.

==================================================

4. MAIN WEBSITE STRUCTURE

==================================================

Create these pages/routes:

/

 /login

 /signup

 /dashboard

 /new-case

 /case/:id

 /sources

 /documents

 /profile

 /about

Also create appropriate error/loading/empty states.

==================================================

5. LANDING PAGE

==================================================

Create a highly polished landing page.

Top navigation:

Logo:

NagrikAI

Navigation:

Home

How it works

Rights

My Cases

About

Right side:

Log in

Get Started

Hero section:

Small badge:

"AI for Civic & Legal Empowerment"

Large headline:

"Your rights shouldn't require a law degree."

Supporting text:

"NagrikAI turns complicated government and legal information into a clear explanation, personalized action plan, and ready-to-use documents."

Primary CTA:

"Check My Rights"

Secondary CTA:

"See How It Works"

Hero visual:

Create a modern dashboard-style illustration/mockup showing:

User problem:

"My landlord hasn't returned my security deposit."

Then show:

Potential issue:

"Rental / Security Deposit"

Status:

"More information needed"

Recommended next step:

"Send a formal refund request"

Sources:

"3 authoritative sources"

Do NOT use fake human photographs.

==================================================

6. HOW IT WORKS SECTION

==================================================

Create a 4-step section:

01

Tell us what happened

"Describe your problem in your own words. No legal language required."

02

We understand the situation

"AI identifies the issue and asks only for the information needed."

03

We find the relevant information

"Relevant government and legal sources are retrieved and shown to you."

04

Get your next step

"Receive a simple explanation, action plan and useful documents."

Use clean icons and a horizontal/vertical responsive layout.

==================================================

7. SUPPORTED AREAS SECTION

==================================================

Create four cards:

Consumer Rights

Icon: shopping bag/shield

Example:

"Bought a defective product? Understand your options."

Tenant & Rental

Icon: home

Example:

"Security deposit, rent disputes and rental issues."

RTI

Icon: document/search

Example:

"Turn a question into a structured RTI application."

Government Schemes

Icon: government/building

Example:

"Understand whether you may qualify for a government scheme."

Each card has:

Explore → button.

==================================================

8. TRUST / TRANSPARENCY SECTION

==================================================

This is extremely important.

Heading:

"AI that shows its work."

Explain that NagrikAI does not simply generate answers from an LLM.

Show three principles:

Source-backed

"Important answers are grounded in retrieved documents and official sources."

Transparent

"See why a source was considered relevant."

Honest about uncertainty

"If information is missing or uncertain, NagrikAI tells you instead of pretending."

Create a visual source card showing:

SOURCE

Consumer Protection Act / official source

RELEVANCE

Why this source matters

LAST UPDATED

Date

VIEW SOURCE

button

==================================================

9. LANDING PAGE CTA

==================================================

Final section:

"Have a civic problem you're not sure how to handle?"

Button:

"Start Your Case"

Footer:

NagrikAI

"Understand your rights. Know your next step."

Links:

Privacy

Terms

Disclaimer

About

Disclaimer:

"NagrikAI provides informational assistance and does not provide legal representation or professional legal advice."

==================================================

10. LOGIN / SIGNUP

==================================================

Create modern authentication pages.

Login:

Email

Password

Remember me

Forgot password

Log in

Signup:

Name

Email

Password

State

Optional preferred language

Use Supabase authentication if available.

If Supabase is not configured yet, create a clean mock authentication flow that can later be connected.

==================================================

11. DASHBOARD

==================================================

The dashboard should feel like a real application.

Header:

"NagrikAI"

Sidebar:

Dashboard

New Case

My Cases

Documents

Sources

Profile

Main content:

Greeting:

"Good afternoon, [Name]"

Main CTA:

"+ Start a new case"

Section:

"How can we help?"

Four large issue cards:

Consumer problem

Tenant / rental issue

RTI request

Government scheme

Section:

"Your recent cases"

Show cards such as:

Case:

Security deposit not returned

Category:

Tenant & Rental

Status:

Action plan ready

Last updated:

Today

Button:

"Continue"

Also show:

"Saved documents"

Example:

Security Deposit Refund Notice

RTI Application Draft

==================================================

12. NEW CASE PAGE

==================================================

This is one of the most important screens.

Heading:

"Tell us what happened."

Subheading:

"You don't need to know the legal terms. Just explain the situation normally."

Large textarea:

Placeholder:

"For example:

My landlord has not returned my ₹20,000 security deposit even though I moved out two months ago..."

Below:

Select issue type:

Consumer

Tenant / Rental

RTI

Government Scheme

State dropdown:

All Indian states and union territories.

Optional:

City/District

Button:

"Analyze My Situation"

Also provide:

"Not sure which category?"

Let AI determine it.

Use a progress indicator when processing:

Understanding your situation...

Finding relevant information...

Checking sources...

Preparing your next steps...

Do NOT fake a long loading process. Use a short realistic loading animation.

==================================================

13. CASE ANALYSIS PAGE

==================================================

This is the core product screen.

Create a professional case workspace.

Top:

CASE #001

Category:

Tenant / Rental

Location:

Assam

Status badge:

"Analysis complete"

Main heading:

"Security deposit not returned"

--------------------------------------------------

SECTION A — WHAT WE UNDERSTAND

--------------------------------------------------

Show:

"You told us:"

"My landlord has not returned my ₹20,000 security deposit after I moved out two months ago."

Then:

"We understand this as:"

"Potential rental/security-deposit dispute"

--------------------------------------------------

SECTION B — WHAT WE NEED TO KNOW

--------------------------------------------------

Create an interactive missing-information section.

Example questions:

1. Do you have a written rental agreement?

Yes / No / Not sure

2. Did the landlord provide a reason for withholding the deposit?

Yes / No

3. Was the property inspected when you moved out?

Yes / No / Not sure

4. Which state is the property in?

Dropdown

Allow users to answer directly.

Button:

"Update Analysis"

==================================================

14. RIGHTS EXPLANATION

==================================================

Heading:

"What may apply to your situation"

Create a clean card:

Potentially relevant right/rule

Simple explanation:

"Based on the information you provided, rules relating to your rental agreement and security deposit may be relevant. The exact position can depend on your state, rental agreement and the reason given for withholding the deposit."

Then:

"Why this may apply"

Show bullet points based on retrieved evidence.

IMPORTANT:

Do not make absolute claims such as:

"You are definitely entitled to X."

Use cautious language:

"may apply"

"appears relevant"

"based on the information provided"

==================================================

15. CONFIDENCE / INFORMATION QUALITY

==================================================

Create a small transparency card:

Assessment confidence:

Medium

Why:

"Your state and rental agreement details are needed for a more precise assessment."

Information completeness:

70%

Missing:

Rental agreement details

Reason for deduction

This makes the AI transparent.

==================================================

16. ACTION PLAN

==================================================

Create a prominent section:

"Your recommended next steps"

Step 1

Collect your documents

Description:

"Keep your rental agreement, deposit receipt, payment records and communication with the landlord."

Step 2

Send a written request

Description:

"Request the return of the deposit and ask for an explanation of any deductions."

Button:

"Generate Request"

Step 3

Escalate if unresolved

Description:

"Review the relevant dispute-resolution options available in your location."

Button:

"Explore Options"

Do not invent specific authorities without source data.

==================================================

17. DOCUMENT GENERATOR

==================================================

When the user clicks "Generate Request", open a document generation interface.

Heading:

"Generate your document"

Show collected information:

Name

Landlord name

Property

Deposit amount

Move-out date

State

Issue

Allow editing.

Document type:

"Security Deposit Refund Request"

Button:

"Generate Document"

After generation show:

DOCUMENT PREVIEW

Formal but understandable language.

Buttons:

Download PDF

Copy

Edit

Save

Create a professional document preview.

The same framework should support:

RTI Application

Consumer Complaint

Formal Request

Scheme-related application guidance

For the MVP, make RTI Application and Security Deposit Refund Request fully demonstrated.

==================================================

18. RTI WORKFLOW

==================================================

When user selects RTI:

Page title:

"Create an RTI request"

Input:

"What information do you want from the government?"

Example:

"I want to know how much money was allocated to road construction in my district in the last financial year and how much was actually spent."

AI should identify:

Possible department

Possible public authority

Information requested

Time period

Location

Then show:

"Suggested RTI structure"

Public Authority:

[identified authority]

Subject:

Request for information regarding...

Questions:

1.

2.

3.

Then:

"Review Application"

Button:

"Generate RTI Application"

IMPORTANT:

Do not claim the exact department is correct unless supported by the knowledge base. Show:

"Suggested public authority — please verify before submission."

==================================================

19. GOVERNMENT SCHEME ELIGIBILITY

==================================================

Create a dedicated interface.

Heading:

"Check scheme eligibility"

Ask:

Age

State

Annual household income

Occupation

Category where legally relevant

Disability status where relevant

Family details

Other scheme-specific questions

Then show:

Possible schemes

Example card:

Scheme Name

"Example Government Scheme"

Eligibility:

"Potentially eligible"

Why:

- Income appears within the stated threshold

- State matches

- Age requirement appears satisfied

Missing:

- Required document

Sources:

Official source

Button:

"View Details"

IMPORTANT:

Use clearly labeled DEMO data unless real official data has been integrated.

==================================================

20. SOURCES PAGE

==================================================

Create a source library.

Heading:

"Verified Information Sources"

Filters:

All

RTI

Consumer

Tenant

Schemes

Each source card:

Source title

Source type

Government / Official

Relevant topic

Last updated

View source

Also include:

"Why we use sources"

"NagrikAI prioritizes official government portals, legislation, regulations and authoritative public documents."

Do not fabricate URLs.

If no real source integration exists yet, use clearly marked demo source records and structure the code so real sources can be inserted later.

==================================================

21. MY CASES

==================================================

Create a searchable case list.

Filters:

All

Active

Completed

Documents generated

Each case:

Title

Category

Date

Status

Confidence

Click → case analysis page.

==================================================

22. DOCUMENTS

==================================================

Create document library.

Cards:

Document name

Type

Created date

Related case

Actions:

View

Download

Delete

==================================================

23. PROFILE

==================================================

Fields:

Name

Email

State

District

Preferred language

Privacy section

Delete account

==================================================

24. AI ARCHITECTURE

==================================================

IMPORTANT:

The application should be designed around a RAG architecture rather than a generic chatbot.

Conceptual flow:

USER QUERY

↓

Intent classification

↓

Extract structured facts

↓

Identify missing information

↓

Retrieve relevant documents

↓

Rank retrieved chunks

↓

Generate grounded response

↓

Attach source citations

↓

Generate action plan

↓

Generate document

Create frontend components that are ready to connect to this backend.

Use structured JSON responses from the AI layer rather than relying entirely on free-form text.

Suggested response schema:

{

  "category": "",

  "summary": "",

  "facts": [],

  "missing_information": [],

  "potential_rights": [],

  "action_steps": [],

  "sources": [],

  "confidence": "",

  "disclaimer": ""

}

==================================================

25. AI SAFETY

==================================================

This is a civic/legal application.

The AI must NOT:

- claim to be a lawyer

- guarantee legal outcomes

- invent laws

- invent government departments

- fabricate citations

- provide fake official URLs

- confidently answer when evidence is insufficient

When information is uncertain, explicitly say:

"I couldn't verify this from the available sources."

When facts are missing:

"I need a little more information before giving you a reliable answer."

Always include:

"Informational assistance only — not legal advice."

==================================================

26. DEMO MODE

==================================================

Create a "Demo Mode" so judges can immediately experience the application without entering personal information.

Add a button on the landing page:

"Try Demo"

Demo scenarios:

DEMO 1:

Tenant security deposit dispute

User:

"My landlord hasn't returned my ₹20,000 security deposit two months after I moved out."

DEMO 2:

Consumer complaint

User:

"I bought a washing machine that stopped working after 20 days and the seller isn't responding."

DEMO 3:

RTI

User:

"I want to know how much money was spent on road construction in my district last year."

When demo is selected, automatically populate the appropriate workflow.

==================================================

27. UI DETAILS

==================================================

Make the UI look like a high-quality startup/hackathon product.

Use:

- rounded cards but not excessive

- subtle shadows

- clean spacing

- consistent typography

- professional icons

- responsive layouts

- smooth hover states

- loading skeletons

- empty states

- success states

- error states

- toast notifications

- accessible buttons

Desktop:

Sidebar dashboard layout.

Mobile:

Bottom navigation or collapsible sidebar.

Do not make every section look like a card.

Use visual hierarchy.

==================================================

28. RESPONSIVENESS

==================================================

The entire application must work on:

Desktop

Laptop

Tablet

Mobile

Pay particular attention to:

- textarea sizing

- document preview

- sidebar

- source cards

- case analysis

- action plan

- forms

==================================================

29. DATABASE DESIGN

==================================================

If using Supabase, create appropriate tables:

users

cases

case_answers

documents

sources

saved_documents

Suggested case fields:

id

user_id

title

category

state

description

status

confidence

created_at

updated_at

Use Row Level Security so users can only access their own cases/documents.

==================================================

30. COMPONENT STRUCTURE

==================================================

Create reusable components:

Navbar

Sidebar

CaseCard

IssueCard

SourceCard

ActionStep

ConfidenceBadge

ProgressIndicator

DocumentPreview

QuestionCard

AIResponse

DisclaimerBanner

EmptyState

LoadingState

Toast

==================================================

31. IMPORTANT TECHNICAL REQUIREMENT

==================================================

Do not create a fake frontend where buttons do nothing.

All major interactions should work.

At minimum:

- navigation works

- demo mode works

- new case flow works

- case information can be entered

- analysis result can be displayed

- questions can be answered

- action plan updates

- document generation works using demo/mock AI if API is not connected

- documents can be saved

- source cards work

- responsive design works

If an external AI API is unavailable, implement a clean mock AI service with structured responses so the application still works end-to-end.

Make the AI service modular so a real Gemini/OpenAI-compatible API can be connected later.

==================================================

32. DEMO DATA

==================================================

Use realistic but clearly fictional demo data where actual live legal data is not connected.

Never present fictional laws or fake government information as real.

For example:

Source:

"Demo Government Source"

Label it clearly:

"DEMO DATA — Replace with verified official source before production."

==================================================

33. FINAL USER EXPERIENCE

==================================================

The ideal user journey should be:

Landing page

↓

"Check My Rights"

↓

Describe problem

↓

Select state

↓

AI analyzes

↓

Answer missing questions

↓

See simple explanation

↓

See relevant sources

↓

See confidence

↓

See personalized action plan

↓

Generate document

↓

Save/download

↓

Return to dashboard

==================================================

34. FINAL DESIGN GOAL

==================================================

The final result should look like a serious AI civic-tech startup that could realistically be presented to judges.

It should NOT look like:

- a generic ChatGPT clone

- a school project

- a template dashboard

- a simple form

- a fake legal website

The main differentiator should be:

"AI + authoritative sources + personalized civic action."

Prioritize usability, trust, transparency and clarity over visual decoration.

Build the application now with the complete frontend, responsive UI, working demo workflow, reusable components, mock AI service, and database-ready architecture.

After building it, check the entire application for broken links, broken buttons, layout issues, mobile responsiveness and inconsistent styling. Fix obvious issues automatically.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nagrik-rights-guide.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e6844411-3416-4695-8b37-b29f5adca3c4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
