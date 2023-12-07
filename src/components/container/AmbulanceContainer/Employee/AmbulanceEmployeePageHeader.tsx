import { Button } from "@/components/elements/Button";
import { PageHeader } from "@/components/elements/PageHeader";
import { useToast } from "@/components/ui/use-toast";
import { usePostApi } from "@/hooks/api";
import { useAmbulanceEmployeeStore } from "@/store/ambulanceEmployee.store";
import Image from "next/image";
import { useRouter } from "next/navigation";
export const AmbulanceEmployeePageHeaderContainer = () => {
  const { mutate } = usePostApi("/ems/ambulances/{ambulance_id}", {
    useLoader: true,
  });
  const { toast } = useToast();
  const router = useRouter();
  const { modifyQueue, ambulance_id, resetQueue } = useAmbulanceEmployeeStore(
    (store) => ({
      modifyQueue: store.employee_modify_queue,
      ambulance_id: store.ambulance?.ambulance_id,
      resetQueue: store.resetQueue,
    })
  );
  return (
    <PageHeader
      title="구급차 정보"
      fontSize="small-l"
      color="grey"
      button={
        <button
          className="h-fit rounded-full text-[0.8rem] text-white"
          onClick={() => router.push("/ambulance")}
        >
          <Image
            src="/icon/back-arrow.svg"
            width={24}
            height={24}
            alt="back-arrow"
          />
        </button>
      }
    >
      <Button
        text="저장하기"
        className="h-16 w-52 rounded-2xl text-xl text-white"
        onClick={async () => {
          if (modifyQueue.length === 0) return;
          const { error } = await mutate({
            params: { path: { ambulance_id: ambulance_id ?? "" } },
            body: {
              additional_employee_list: modifyQueue
                .filter((q) => q.action === "ADD")
                .map((q) => ({
                  employee_id: q.employee_id,
                  team_role: q.team_role,
                })),
              removal_employee_list: modifyQueue.filter(
                (q) => q.action === "REMOVE"
              ),
            },
          });
          if (error) toast({ description: error.message });
          else resetQueue();
        }}
      />
    </PageHeader>
  );
};
