import { Header } from 'components/Header';
import { repoUrl, weeks } from 'consts';
import Link from 'next/link';

const ExercisesPage = () => {
  const codeHref = (codeHref: string) => `${repoUrl}${codeHref}`;
  return (
    <>
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {weeks.map((week) => (
          <div
            className="bg-white shadow overflow-hidden sm:rounded-lg mt-2 sm:mt-6 lg:mt-8"
            key={week.number}
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {`Week ${week.number}`}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {week.description}
              </p>
            </div>
            {week.exercises.map((exercise, index) => (
              <div className="border-t border-gray-200" key={exercise.number}>
                <dl>
                  <div
                    className={`${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <dt className="text-sm font-medium">
                      <Link
                        href={
                          exercise.liveHref ||
                          `exercises/week-${week.number}/exercise-${exercise.number}`
                        }
                      >
                        <a className="text-blue-500 underline hover:text-blue-700">{`Exercise ${exercise.number}`}</a>
                      </Link>
                      <Seperator />
                      <Link href={codeHref(exercise.codeHref)}>
                        <a className="text-blue-500 underline hover:text-blue-700">
                          Code
                        </a>
                      </Link>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {exercise.description}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        ))}
      </main>
    </>
  );
};

export default ExercisesPage;

const Seperator = () => <span className="mx-2">|</span>;
