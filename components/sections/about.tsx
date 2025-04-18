import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-zinc-100 mb-12">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/assets/myimage.jpeg" // Corrected path
              alt="Profile Picture"
              width={500} // Replace with the actual width of the image
              height={500} // Replace with the actual height of the image
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-300">
            <p>
              Hello! I'm a passionate front-end developer with a deep expertise
              in crafting modern, intuitive, and accessible web experiences. I
              thrive on bringing beautiful designs to life while ensuring they
              are fully functional, responsive, and performant.
            </p>
            <p>
              With over 2 years of experience, I blend creativity with technical
              proficiency to develop solutions that are both visually appealing
              and user-centric. Every project is an opportunity to enhance the
              user experience and solve complex challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
