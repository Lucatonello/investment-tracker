import { NewCoinForm } from "../_components/NewCoinForm";
import { PageWithBackArrow } from "../_components/PageWithBackArrow";

export default function AddCoin() {
    return <div>
        <PageWithBackArrow title="Add investment">
            <NewCoinForm />
        </PageWithBackArrow>
    </div>
}