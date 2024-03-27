import { runServerSideQuery, PageContext, getRequestContext } from "rakkasjs";
import { useQuery } from "@tanstack/react-query";

export const clientSessionQueryKey = ["session"];
export type UseClientSessionResult = ReturnType<Awaited<typeof useClientSession>>;

export function getSessionQueryData(ctx: PageContext) {
	return ctx.tanstackQueryClient.getQueryData<UseClientSessionResult>(clientSessionQueryKey);
}

export function useClientSession() {
	function queryFn() {
		return runServerSideQuery(
			getRequestContext(),
			(ctx) => {
				// ensure the login-session query isn't cached!
				ctx.headers.set("Cache-Control", "no-store");
				ctx.headers.set("CDN-Cache-Control", "no-store");

				return {
					id: ctx.session.data.sessionId,
					user: ctx.session.data?.user,
					userId: ctx.session.data?.userId,
					email: ctx.session.data?.email,
				};
			},
			{
				uniqueId: "client-session",
				usePostMethod: true,
			},
		);
	}

	const result = useQuery({
		queryKey: clientSessionQueryKey,
		queryFn,
		refetchOnMount: true,
		refetchOnReconnect: true,
		refetchOnWindowFocus: false,
		refetchInterval: 60 * 1000, // 1 minute
	});

	return result;
}
