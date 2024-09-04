import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChannelType, MemberRole } from "@prisma/client";

import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc",
                }
            }
        }
    });
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;
    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#3f4148] bg-[#e9eaed]">
            <ServerHeader
                server={server}
                role={role}
            />

        </div>
    );
};



