import { useNavContext } from "@/context/NavContext";
import Image from "next/image";
import Link from "next/link";

export default function Categories({ categories, occasions, recipients }) {
  const { open, setOpen } = useNavContext();
  const sections = [
    {
      id: "categories",
      title: "Gifts By Categories",
      linkPrefix: "/shop/",
      data: categories,
    },
    {
      id: "occasions",
      title: "Gifts By Occasion",
      linkPrefix: "/shop?occasion=",
      data: occasions,
    },
    {
      id: "recipients",
      title: "Gifts By Recipient",
      linkPrefix: "/shop?recipient=",
      data: recipients,
    },
  ];
  return (
    <div className="mx-4">
      {sections.map((section, index) => {
        return (
          <div key={index}>
            {section.data.length > 0 && (
              <div className="mt-6">
                <h1 className="text-gray-800 text-md font-bold">
                  {section.title}
                </h1>
                {section.data.map((d) => (
                  <Link
                    onClick={() => setOpen(false)}
                    href={section.linkPrefix + d.slug}
                    className="flex gap-x-4 hover:opacity-90 p-4"
                    key={d.id}
                  >
                    <div className=" flex h-11 w-11 flex-none items-center justify-center rounded-lg ">
                      <Image
                        src={
                          d.image
                            ? `${normalizeImageUrl(d.image)}`
                            : "/no-image.jpg"
                        }
                        width={50}
                        height={50}
                        alt="category image"
                      />
                    </div>

                    <span className="my-auto font-medium text-gray-700 hover:text-primary">
                      {d.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
