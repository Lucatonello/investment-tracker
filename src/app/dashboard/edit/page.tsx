import { EditInvestmentForm } from "../_components/EditInvestmentForm";
import { PageWithBackArrow } from "../_components/PageWithBackArrow";

export function EditInvestment() {
    return (
        <PageWithBackArrow title="Edit Investment">
            <EditInvestmentForm investment={} />
        </PageWithBackArrow>
    )
}