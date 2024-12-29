import { redirect } from "next/navigation";
import { EditInvestmentForm } from "../_components/EditInvestmentForm";
import { PageWithBackArrow } from "../_components/PageWithBackArrow";

const userId = localStorage.getItem('userId')
if (!userId) redirect('/auth/sign-in')

export function EditInvestment() {
    return (
        <PageWithBackArrow title="Edit Investment">
            <EditInvestmentForm investment={} />
        </PageWithBackArrow>
    )
}