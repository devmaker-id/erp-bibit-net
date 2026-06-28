import { requireAuth } from "@/modules/auth/guards";

const auth = await requireAuth();

return (
    <AppLayout auth={auth}>
        {children}
    </AppLayout>
);