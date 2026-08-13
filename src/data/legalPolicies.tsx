import { Body, Bullet, NumberedStep, Section, SubHeading } from "@/components/legal/PolicyContent";
import {
  ShieldCheck,
  FileText,
  MessageSquareWarning,
  AlertTriangle,
  Banknote,
  Users,
} from "lucide-react";

export const legalPolicies = [
  {
    slug: "terms",
    label: "Terms & Conditions",
    icon: FileText,
    content: (
      <>
        <Section title="1. What Visa Guard Africa Is">
          <Body>
            Visa Guard Africa Technologies LTD is NOT a travel agency, immigration consultant,
            recruitment agency, or visa processing company. We provide Trust Infrastructure -
            verification, escrow-protected payments, and dispute resolution - for the travel and
            visa services market.
          </Body>
        </Section>
        <Section title="2. Traveler Responsibilities">
          <ul className="space-y-2">
            <Bullet>Provide accurate personal and document information</Bullet>
            <Bullet>Fund milestones only through the Visa Guard platform</Bullet>
            <Bullet>Report suspicious activity or fraudulent agents</Bullet>
          </ul>
        </Section>
        <Section title="3. Agent Responsibilities">
          <ul className="space-y-2">
            <Bullet>Complete Visa Guard's verification process before onboarding</Bullet>
            <Bullet>Create accurate milestones and deliver agreed work</Bullet>
            <Bullet>Communicate and receive payment only through the platform</Bullet>
          </ul>
        </Section>
        <Section title="4. Platform Rules">
          <ul className="space-y-2">
            <Bullet>No off-platform payments or communication intended to bypass escrow</Bullet>
            <Bullet>No fraudulent documents or misrepresentation</Bullet>
            <Bullet>No harassment, spam, or abuse of other users</Bullet>
          </ul>
        </Section>
        <Section title="5. Verification Process">
          <Body>
            Agents undergo identity, credential, and background verification before receiving a
            verification badge. Visa Guard reserves the right to revoke a badge if standards are no
            longer met.
          </Body>
        </Section>
        <Section title="6. Trust Score">
          <Body>
            Every user maintains a Trust Score reflecting platform behaviour, completed milestones,
            disputes, and policy violations.
          </Body>
        </Section>
        <Section title="7. Account Suspension">
          <Body>
            Accounts may be suspended or permanently removed for fraud, fake documents, off-platform
            solicitation, harassment, or repeated policy violations.
          </Body>
        </Section>
        <Section title="8. AI Moderation">
          <Body>
            Visa Guard uses AI-assisted monitoring to detect fraud indicators and off-platform
            solicitation.
          </Body>
        </Section>
        <Section title="9. Acceptance of Terms">
          <Body>
            By creating an account or using the platform, you confirm that you have read,
            understood, and agreed to these Terms & Conditions, our Privacy Policy, and all related
            policies.
          </Body>
        </Section>
      </>
    ),
  },
  {
    slug: "privacy",
    label: "Privacy Policy",
    icon: ShieldCheck,
    content: (
      <>
        <Section title="1. Introduction">
          <Body>
            Visa Guard Africa is committed to protecting your personal data and handling it securely
            and transparently, in compliance with the Nigeria Data Protection Regulation (NDPA) and
            the Nigeria Data Protection Commission (NDPC).
          </Body>
        </Section>
        <Section title="2. Data We Collect">
          <Body>Full name</Body>
          <Body>Email address</Body>
          <Body>Phone number</Body>
          <Body>Visa and supporting documents</Body>
        </Section>
        <Section title="3. Purpose of Data Collection">
          <ul className="space-y-2">
            <Bullet>Visa processing and application support</Bullet>
            <Bullet>Agent verification and onboarding</Bullet>
            <Bullet>Secure transaction and escrow processing</Bullet>
            <Bullet>Communication and support services</Bullet>
          </ul>
        </Section>
        <Section title="4. Consent">
          <ul className="space-y-2">
            <Bullet>You agree to the collection and processing of your personal data</Bullet>
            <Bullet>You confirm the information you provide is accurate</Bullet>
            <Bullet>You may withdraw consent at any time</Bullet>
          </ul>
        </Section>
        <Section title="5. Data Security">
          <ul className="space-y-2">
            <Bullet>All sensitive data is encrypted</Bullet>
            <Bullet>Secure connections (HTTPS) are used at all times</Bullet>
            <Bullet>Access is restricted to authorized personnel only</Bullet>
            <Bullet>All data access is logged for accountability</Bullet>
          </ul>
        </Section>
        <Section title="6. Your Rights">
          <ul className="space-y-2">
            <Bullet>Access your personal data</Bullet>
            <Bullet>Request correction of inaccurate data</Bullet>
            <Bullet>Request deletion of your data, where applicable</Bullet>
          </ul>
        </Section>
        <Section title="7. Data Retention">
          <ul className="space-y-2">
            <Bullet>Complete visa processes</Bullet>
            <Bullet>Maintain transaction records</Bullet>
            <Bullet>Comply with legal obligations</Bullet>
          </ul>
        </Section>
        <Section title="8. Cross-Border Data Use">
          <Body>
            If services expand beyond Nigeria, Visa Guard Africa will ensure personal data
            transferred across borders remains protected under applicable data protection laws.
          </Body>
        </Section>
        <Section title="9. Updates to This Policy">
          <Body>
            We may update this policy from time to time. Users will be notified of significant
            changes.
          </Body>
        </Section>
        <Section title="10. Contact & Support">
          <Body>
            Questions or requests regarding your data can be directed to our support team through
            the platform.
          </Body>
        </Section>
      </>
    ),
  },
  {
    slug: "payment-protection",
    label: "Payment Protection Policy",
    icon: Banknote,
    content: (
      <>
        <Section title="1. Milestone-Based Escrow Protection">
          <Body>
            Visa Guard uses a milestone-based payment authorization system integrated with licensed
            payment providers, including Paystack. Visa Guard does NOT directly hold users' money -
            funds remain securely managed by our payment partner until agreed milestones are
            completed and verified.
          </Body>
        </Section>
        <Section title="How a Protected Payment Flows">
          <SubHeading>Step by step</SubHeading>
          <div className="space-y-3">
            <NumberedStep index={1}>
              The verified agent creates a milestone outlining the specific service to be delivered.
            </NumberedStep>
            <NumberedStep index={2}>
              Visa Guard reviews the milestone before it becomes available to the traveler.
            </NumberedStep>
            <NumberedStep index={3}>
              The traveler approves and funds the milestone through Paystack.
            </NumberedStep>
            <NumberedStep index={4}>
              The agent completes the work and uploads supporting evidence.
            </NumberedStep>
            <NumberedStep index={5}>Admin reviews the submitted evidence.</NumberedStep>
            <NumberedStep index={6}>
              Once approved, Paystack automatically releases payment to the verified agent.
            </NumberedStep>
          </div>
        </Section>
        <Section title="2. Platform Revenue">
          <Body>
            Visa Guard earns revenue only through legitimate platform services - subscription plans,
            service fees, and approved commissions. We do not claim ownership of traveler or agent
            funds beyond these authorized charges.
          </Body>
        </Section>
        <Section title="3. Transparency & Audit Trail">
          <ul className="space-y-2">
            <Bullet>Transaction and milestone reference</Bullet>
            <Bullet>Payment status, date and time</Bullet>
            <Bullet>Verification history and administrative approvals</Bullet>
            <Bullet>Refund and dispute history, where applicable</Bullet>
          </ul>
        </Section>
      </>
    ),
  },
  {
    slug: "off-platform-payment",
    label: "Off-Platform Payment Policy",
    icon: AlertTriangle,
    content: (
      <>
        <Section title="1. Risk of Off-Platform Payments">
          <Body>
            If a traveler or agent makes or receives payment outside the Visa Guard platform, such
            transactions are entirely at their own risk.
          </Body>
        </Section>
        <Section title="2. What Visa Guard Cannot Do">
          <ul className="space-y-2">
            <Bullet>Cannot protect off-platform funds</Bullet>
            <Bullet>Cannot investigate off-platform transactions</Bullet>
            <Bullet>Cannot refund off-platform payments</Bullet>
          </ul>
        </Section>
        <Section title="3. Waiver of Protection">
          <Body>
            Users who bypass the Visa Guard Escrow System automatically waive the protections
            offered by our Trust Infrastructure for that transaction.
          </Body>
        </Section>
        <Section title="4. Consequences of Bypassing Escrow">
          <ul className="space-y-2">
            <Bullet>Suspension of the account</Bullet>
            <Bullet>Permanent removal from the platform</Bullet>
            <Bullet>Removal of verification badge</Bullet>
            <Bullet>Reduction of Trust Score</Bullet>
            <Bullet>Possible reporting to relevant authorities where necessary</Bullet>
          </ul>
        </Section>
      </>
    ),
  },
  {
    slug: "off-platform-communication",
    label: "Off-Platform Communication Policy",
    icon: MessageSquareWarning,
    content: (
      <>
        <Section title="1. Why Communication Stays On-Platform">
          <ul className="space-y-2">
            <Bullet>AI-assisted scam monitoring</Bullet>
            <Bullet>Evidence preservation for disputes</Bullet>
            <Bullet>Faster dispute resolution</Bullet>
            <Bullet>Stronger security for both travelers and agents</Bullet>
          </ul>
        </Section>
        <Section title="2. Prohibited Solicitation">
          <Body>
            Agents and travelers must not encourage, request, or pressure each other to move
            communication or payments outside the Visa Guard platform for the purpose of bypassing
            our security and escrow systems.
          </Body>
        </Section>
        <Section title="3. Consequences">
          <ul className="space-y-2">
            <Bullet>Loss of escrow and dispute protection for the affected transaction</Bullet>
            <Bullet>Trust Score penalties</Bullet>
            <Bullet>Account suspension for repeated or severe attempts</Bullet>
          </ul>
        </Section>
      </>
    ),
  },
  {
    slug: "community-guidelines",
    label: "Community Guidelines",
    icon: Users,
    content: (
      <>
        <Section title="1. Platform Behaviour">
          <Body>
            All users are expected to engage honestly, respectfully, and in good faith with
            travelers and agents on the platform.
          </Body>
        </Section>
        <Section title="2. Fraud Policy">
          <Body>
            Any attempt to misrepresent services, credentials, or outcomes will result in immediate
            review and possible suspension.
          </Body>
        </Section>
        <Section title="3. Fake Document Policy">
          <Body>
            Submitting falsified identity, credential, or visa documents is strictly prohibited and
            may be reported to relevant authorities.
          </Body>
        </Section>
        <Section title="4. Harassment Policy">
          <Body>
            Abusive, threatening, or discriminatory conduct toward other users is not tolerated.
          </Body>
        </Section>
        <Section title="5. Spam Policy">
          <Body>
            Unsolicited promotional messages, repeated off-topic content, or manipulation of reviews
            are prohibited.
          </Body>
        </Section>
        <Section title="6. Trust Score Violations">
          <Body>
            Confirmed violations of these guidelines reduce a user's Trust Score and may restrict
            platform access.
          </Body>
        </Section>
        <Section title="7. Suspension Rules">
          <ul className="space-y-2">
            <Bullet>First violation: warning and Trust Score reduction</Bullet>
            <Bullet>Repeated or severe violations: account suspension</Bullet>
            <Bullet>Fraud or fake documents: permanent removal</Bullet>
          </ul>
        </Section>
      </>
    ),
  },
];
