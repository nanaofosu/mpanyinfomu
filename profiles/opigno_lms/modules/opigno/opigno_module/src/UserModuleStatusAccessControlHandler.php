<?php

namespace Drupal\opigno_module;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the User module status entity.
 *
 * @see \Drupal\opigno_module\Entity\UserModuleStatus.
 */
class UserModuleStatusAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\opigno_module\Entity\UserModuleStatusInterface $entity */

    // Get trainings where the current user is a 'student manager' or user has global role 'class manager'.
    $membership_service = \Drupal::service('group.membership_loader');
    $memberships = $membership_service->loadByUser($account, [
      'learning_path-user_manager',
      'opigno_class-class_manager',
    ]);

    $groups_ids = [];
    $members_ids = [];

    foreach ($memberships as $membership) {
      $group = $membership->getGroup();
      $members = $group->getMembers();

      foreach ($members as $member) {
        $members_ids[] = $member->getUser()->id();
      }

      if ($group->bundle() == 'opigno_class') {
        $db_connection = \Drupal::service('database');
        $query_class = $db_connection->select('group_content_field_data', 'g_c_f_d')
          ->fields('g_c_f_d', ['gid'])
          ->condition('entity_id', $group->id())
          ->condition('type', 'group_content_type_27efa0097d858')
          ->execute()
          ->fetchAll();

        foreach ($query_class as $result_ids) {
          $groups_ids[] = $result_ids->gid;
        }
      }
      else {
        $groups_ids[] = $group->id();
      }
    }

    $members_ids = array_unique($members_ids);

    $lp_id = $entity->get('learning_path')->getValue()[0]['target_id'];

    if (in_array($lp_id, $groups_ids) && ($operation == 'view' || $operation == 'update') && in_array($entity->getOwnerId(), $members_ids)) {
      return AccessResult::allowed();
    }

    switch ($operation) {
      case 'view':
        if ($account->hasPermission('view module results')) {
          return AccessResult::allowed();
        }

        if ($entity->getOwnerId() === $account->id() && $account->hasPermission('view own module results')) {
          return AccessResult::allowed();
        }

        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished user module status entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published user module status entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit user module status entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete user module status entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add user module status entities');
  }

}
