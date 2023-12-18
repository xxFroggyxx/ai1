<?php

/** @var \App\Model\Course $post */
/** @var \App\Service\Router $router */

$title = 'Create course';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create course</h1>
    <form action="<?= $router->generatePath('course-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="course-create">
    </form>

    <a href="<?= $router->generatePath('course-index') ?>">Back to courses</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';