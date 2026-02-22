import Image from "next/image";

export default function Home() {
  return (
    <div id="home" className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-[#3f6647]">
      <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-start justify-start bg-white px-16 py-20 dark:bg-[#3f6647]">
        <section className="flex min-h-[70vh] w-full flex-col items-start justify-center gap-6 text-left">
          <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight text-black dark:black">
            Hello, I'm Wäinö Vänskä!
          </h1>

          <h1 className="text-2xl text-black dark:black">
            I'm an Information Technology student in Aalto University.
          </h1>
        </section>

        <section id="projects" className="mt-40 flex min-h-[80vh] w-full flex-col items-start gap-6 pb-24 text-left scroll-mt-8">
          <h1 className="text-3xl font-semibold text-black dark:black">Projects</h1>
          <div className="mt-4 flex w-full items-start justify-between gap-8 rounded-2xl bg-[#355a40] p-6">
            <div className="flex max-w-xl flex-col items-start gap-4">
              <h1 className="text-2xl font-semibold text-black dark:black">Work Time Tracker</h1>
              <h1 className="text-left text-lg text-black">
                Work time concentration tracker made for Web Software Development course. There's a working database that stores
                concentration data linked to the account. Backend has authentication checks to ensure that only the logged in user can
                access and use their account.
              </h1>
              <a
                href="https://worktimetracker2.wainovanska.deno.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#005a00] px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-[#004300] hover:shadow-md"
              >
                Try it
              </a>
            </div>
            <Image src="/IMG_3569.PNG" alt="My photo" width={250} height={150} />
          </div>
        </section>
      </main>
    </div>
  );
}
