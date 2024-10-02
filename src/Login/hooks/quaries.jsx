
import { useQuery } from "react-query";
import { fetchUsers } from "../../services/users-api";


export function useAuthUser() {
    return useQuery({
    queryKey: ['user'],
    queryFn: fetchUsers,
    staleTime: Infinity
  })
}