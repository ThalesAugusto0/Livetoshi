import Form from "@/components/profile/Form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { loadConfig, Settings } from "@/lib/config";
import { getUser } from "@/lib/nostr/users";
import Image from "next/image";

const config: Settings = loadConfig();

interface PageProps {
  params: { npub: string };
}

export default async function GoalPage({ params }: PageProps) {
  const profile = await getUser(params.npub);

  const banner = profile.getBanner();
  const name = profile.getDisplayName();
  const picture = profile.getPicture();

  return (
    <>
      {banner && (
        <Image
          src={banner}
          fill
          alt="background image"
          className="absolute top-0 left-0 object-cover blur brightness-75 -z-10 w-full h-full"
        />
      )}

      <Card className="max-w-md mx-auto mt-12 relative">
        <CardHeader className="mt-10">
          {picture && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-card rounded-full overflow-hidden w-28 h-28">
              <Image
                src={picture}
                fill={true}
                alt={`Picture of ${name}`}
                className="object-cover"
              />
            </div>
          )}

          <h2 className="text-2xl font-bold text-center mx-auto">{name}</h2>

          <p className="text-center text-gray-600">
            Envie uma mensagem para{" "}
            <span className="font-bold">{profile.getName()}</span> usando
            satoshis
          </p>
        </CardHeader>

        <CardContent>
          <Form
            npub={params.npub}
            config={config}
            // onPaymentSettled={handlePaymentSettled}
          />
        </CardContent>
      </Card>
    </>
  );
}
