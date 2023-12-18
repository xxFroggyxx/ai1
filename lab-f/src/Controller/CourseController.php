<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Course;
use App\Service\Router;
use App\Service\Templating;

class CourseController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $courses = Course::findAll();
        $html = $templating->render('course/index.html.php', [
            'courses' => $courses,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestCourse, Templating $templating, Router $router): ?string
    {
        if ($requestCourse) {
            $course = Course::fromArray($requestCourse);
            // @todo missing validation
            $course->save();

            $path = $router->generatePath('course-index');
            $router->redirect($path);
            return null;
        } else {
            $course = new Course();
        }

        $html = $templating->render('course/create.html.php', [
            'course' => $course,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $courseId, ?array $requestCourse, Templating $templating, Router $router): ?string
    {
        $course = Course::find($courseId);
        if (!$course) {
            throw new NotFoundException("Missing course with id $courseId");
        }

        if ($requestCourse) {
            $course->fill($requestCourse);
            // @todo missing validation
            $course->save();

            $path = $router->generatePath('course-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('course/edit.html.php', [
            'course' => $course,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $courseId, Templating $templating, Router $router): ?string
    {
        $course = Course::find($courseId);
        if (! $course) {
            throw new NotFoundException("Missing course with id $courseId");
        }

        $html = $templating->render('course/show.html.php', [
            'course' => $course,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $courseId, Router $router): ?string
    {
        $course = Course::find($courseId);
        if (! $course) {
            throw new NotFoundException("Missing course with id $courseId");
        }

        $course->delete();
        $path = $router->generatePath('course-index');
        $router->redirect($path);
        return null;
    }
}