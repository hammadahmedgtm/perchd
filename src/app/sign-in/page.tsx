import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RailLayout } from "@/components/layout/RailLayout";
import { SignInForm } from "@/components/auth/SignInForm";

export default async function SignInPage(props: PageProps<"/sign-in">) {
  const searchParams = await props.searchParams;
  const next = typeof searchParams.next === "string" ? searchParams.next : null;

  return (
    <div>
      <SiteHeader />
      <RailLayout>
        <SignInForm nextPath={next} />
      </RailLayout>
      <SiteFooter />
    </div>
  );
}
